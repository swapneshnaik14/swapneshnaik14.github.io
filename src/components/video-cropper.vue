<template>
  <div class="video-editor-wrapper">
    <div class="video-editor">
      <div class="video-editor__header">
        <div class="video-editor__title">Cropper</div>
        <div class="video-editor__tabs">
          <div class="video-editor__preview" :class="{ 'video-editor--active': sessionType === 'preview' }"
            @click="startPreview">
            Preview Session
          </div>
          <div class="video-editor__session" :class="{ 'video-editor--active': sessionType === 'generate' }"
            @click="setSession">
            Generate Session
          </div>
        </div>
      </div>
      <div class="video-editor__container">
        <div class="video-editor__main">
          <!-- Video Player -->
          <video ref="videoPlayer" class="video-editor__player" @loadedmetadata="onLoadedMetadata"
            @timeupdate="updateSeekTime">
            <source :src="video" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <!-- Overlay and Cropper Layer -->
          <div class="video-editor__cropper-overlay" v-if="isCropperActive">
            <div ref="cropper" class="video-editor__cropper" :style="cropperStyle" @mousedown="startDrag"
              @mousemove="onDrag" @mouseup="endDrag" @touchstart="startDrag" @touchmove="onDrag" @touchend="endDrag">
            </div>
          </div>

          <div>
            <!-- Playback Controls -->
            <div class="video-editor__controls">
              <div @click="togglePlay" v-if="sessionType === 'generate'" class="video-editor__play-pause-btn">
                <div :class="isPlaying
                  ? 'video-editor__pause-icon'
                  : 'video-editor__play-icon'
                  "></div>
              </div>
              <input type="range" v-model="seekTime" :max="duration" step="0.01" @mousedown="pauseSeekUpdates"
                @input="debouncedSeek" @mouseup="resumeSeekUpdates" class="video-editor__seek-bar"
                :disabled="sessionType === 'preview'" />
            </div>
            <div class="video-editor__volume">
              <div class="video-editor__time">
                {{ formattedCurrentTime }} | {{ formattedDuration }}
              </div>

              <div class="video-editor__volume-control">
                <img :src="videoVolume" alt="video-volume" />
                <input type="range" v-model="volume" min="0" max="1" step="0.01" @input="changeVolume"
                  class="video-editor__volume-slider" :disabled="sessionType === 'preview'" />
              </div>
            </div>

            <div class="video-editor__controls-group">
              <div class="video-editor__speed">
                <label>Speed</label>
                <select v-model="playbackRate" @change="changePlaybackRate" class="video-editor__speed-select"
                  :disabled="sessionType === 'preview'">
                  <option v-for="rate in playbackRates" :key="rate" :value="rate">
                    {{ rate }}x
                  </option>
                </select>
              </div>
              <!-- Aspect Ratio Selector -->
              <div class="video-editor__aspect-ratio-selector">
                <label>Cropper Aspect Ratio</label>
                <select v-model="aspectRatio" @change="updateCropperDimensions"
                  class="video-editor__aspect-ratio-select" :disabled="sessionType === 'preview'">
                  <option v-for="ratio in aspectRatios" :key="ratio.value" :value="ratio.value">
                    {{ ratio.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="video-editor__side-preview-wrapper">
          <div class="video-editor__side-preview-text">Preview</div>
          <div class="video-editor__side-preview" :class="{ 'video-editor__cropper-active': isCropperActive }">
            <div v-if="!isCropperActive" class="video-editor__side-preview-content">
              <img :src="vector" alt="vector" />
              <div class="video-editor__preview-not-available">
                Preview not available
              </div>
              <div class="video-editor__start-cropper-instruction">
                Please click on “Start Cropper” and then play video
              </div>
            </div>
            <div class="video-editor__preview-container" v-else>
              <canvas ref="previewCanvas" class="video-editor__preview-canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
      <CropperControls :sessionType="sessionType" @setSession="setSession" @startCropper="startCropper"
        @removeCropper="removeCropper" @logRecords="logRecords" :isCropperActive="isCropperActive" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import CropperControls from "./cropper-controls.vue";
import vector from "@/assets/vector.png";
import video from "@/assets/video-verse.mp4";
import videoVolume from "@/assets/video-volume.png";

export default {
  components: {
    CropperControls,
  },
  data() {
    return {
      playbackRates: [0.5, 1, 1.5, 2, 2.5],
      aspectRatios: [
        { value: "9/18", label: "9:18" },
        { value: "9/16", label: "9:16" },
        { value: "4/3", label: "4:3" },
        { value: "3/4", label: "3:4" },
        { value: "1/1", label: "1:1" },
        { value: "4/5", label: "4:5" },
      ],
      isPlaying: false,
      playbackRate: 1,
      volume: 1,
      seekTime: 0,
      duration: 0,
      cropperData: { x: 50, y: 50, width: 200, height: 200 },
      cropperStyle: {
        top: "50px",
        left: "50px",
        width: "200px",
        height: "200px",
      },
      aspectRatio: "9/18",
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      previewCtx: null,
      frameRequest: null,
      isSeeking: false,
      isCropperActive: false,
      records: [],
      isPreviewing: false,
      sessionType: "generate",
      vector,
      video,
      videoVolume,
    };
  },
  mounted() {
    // Debounced seek function setup in mounted
    this.debouncedSeek = _.debounce(() => {
      this.seek();
    }, 50); // Shorter debounce time to make seeking smoother
  },
  methods: {
    setSession() {
      // Reset all session-related properties
      Object.assign(this, {
        records: [],
        isPlaying: false,
        seekTime: 0,
        volume: 1,
        playbackRate: 1,
        isCropperActive: false,
        isPreviewing: false,
        aspectRatio: "9/18",
        cropperData: { x: 50, y: 50, width: 200, height: 200 },
        cropperStyle: {
          top: "50px",
          left: "50px",
          width: "200px",
          height: "200px",
        },
        sessionType: "generate",
      });
      this.$refs.videoPlayer.currentTime = 0;
      this.$refs.videoPlayer.volume = 1;
      this.$refs.videoPlayer.playbackRate = 1;
    },
    recordData() {
      if (this.$refs.cropper && this.sessionType === "generate") {
        const videoPlayer = this.$refs.videoPlayer;
        const cropper = this.$refs.cropper;
        const videoRect = videoPlayer.getBoundingClientRect();
        const cropperRect = cropper.getBoundingClientRect();

        // Calculate coordinates relative to the video player
        const coordinates = [
          cropperRect.left - videoRect.left,
          cropperRect.top - videoRect.top,
          cropperRect.right - videoRect.left,
          cropperRect.bottom - videoRect.top,
        ];

        this.records.push({
          timeStamp: parseFloat(videoPlayer.currentTime.toFixed(2)),
          coordinates,
          volume: parseFloat(videoPlayer.volume.toFixed(2)),
          playbackRate: parseFloat(videoPlayer.playbackRate.toFixed(2)),
        });
      }
    },
    logRecords() {
      // Convert the records array to JSON string
      const jsonContent = JSON.stringify(this.records, null, 2);

      // Create a Blob from the JSON string
      const blob = new Blob([jsonContent], { type: "application/json" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = "cropper_records.json"; // The filename for the downloaded file

      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Cleanup: Remove the link and revoke the Blob URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    formatTime(timeInSeconds) {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
    onLoadedMetadata() {
      if (this.$refs.videoPlayer) {
        this.duration = this.$refs.videoPlayer.duration;
        this.updateCropperDimensions();
      }
    },
    togglePlay() {
      const video = this.$refs.videoPlayer;
      if (this.isPlaying) {
        video.pause();
        cancelAnimationFrame(this.frameRequest);
      } else {
        this.updateCropperDimensions(); // Update cropper dimensions
        this.updatePreviewCanvas(); // Start drawing on the canvas
        video.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    changePlaybackRate() {
      this.$refs.videoPlayer.playbackRate = parseFloat(this.playbackRate);
    },
    changeVolume() {
      this.$refs.videoPlayer.volume = this.volume;
    },
    seek() {
      this.$refs.videoPlayer.currentTime = this.seekTime;
    },
    updateSeekTime() {
      if (!this.isSeeking && !this.isPreviewing) {
        this.seekTime = this.$refs.videoPlayer.currentTime;
        this.recordData();
      }
      if (this.$refs.videoPlayer.ended) {
        this.isPlaying = false;
      }
    },
    pauseSeekUpdates() {
      this.isSeeking = true;
    },
    resumeSeekUpdates() {
      this.isSeeking = false;
      this.seek();
    },
    startDrag(event) {
      if (this.isPreviewing) return;
      event.preventDefault();
      this.isDragging = true;
      const mouseEvent = event.type.startsWith("touch")
        ? event.touches[0]
        : event;
      this.dragStartX = mouseEvent.clientX - this.cropperData.x;
      this.dragStartY = mouseEvent.clientY - this.cropperData.y;
    },
    onDrag(event) {
      if (!this.isDragging || this.isPreviewing) return;
      const mouseEvent = event.type.startsWith("touch")
        ? event.touches[0]
        : event;
      let newX = mouseEvent.clientX - this.dragStartX;
      let newY = mouseEvent.clientY - this.dragStartY;

      const videoRect = this.$refs.videoPlayer.getBoundingClientRect();
      const cropperRect = this.$refs.cropper.getBoundingClientRect();

      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + cropperRect.width > videoRect.width)
        newX = videoRect.width - cropperRect.width;
      if (newY + cropperRect.height > videoRect.height)
        newY = videoRect.height - cropperRect.height;

      this.cropperData.x = newX;
      this.cropperData.y = newY;
      this.cropperStyle = {
        top: `${newY}px`,
        left: `${newX}px`,
        width: `${this.cropperData.width}px`,
        height: `${this.cropperData.height}px`,
      };
      this.recordData();
    },
    endDrag() {
      this.isDragging = false;
      this.recordData();
    },
    updateCropperDimensions() {
      const videoHeight = this.$refs.videoPlayer.offsetHeight;
      const ratios = {
        "9/18": { width: (9 / 18) * videoHeight, height: videoHeight },
        "9/16": { width: (9 / 16) * videoHeight, height: videoHeight },
        "4/3": { width: (4 / 3) * videoHeight, height: videoHeight },
        "3/4": { width: (3 / 4) * videoHeight, height: videoHeight },
        "1/1": { width: videoHeight, height: videoHeight },
        "4/5": { width: (4 / 5) * videoHeight, height: videoHeight },
      };
      const selectedRatio = ratios[this.aspectRatio];
      Object.assign(this.cropperData, {
        width: selectedRatio.width,
        height: selectedRatio.height,
      });

      // Set initial position with boundary checks
      const videoRect = this.$refs.videoPlayer.getBoundingClientRect();
      let newX = Math.max(0, (videoRect.width - this.cropperData.width) / 2);
      let newY = 0; // Starting from the top

      this.cropperData.x = Math.min(
        newX,
        videoRect.width - this.cropperData.width
      );
      this.cropperData.y = Math.min(
        newY,
        videoRect.height - this.cropperData.height
      );

      this.cropperStyle = {
        width: `${this.cropperData.width}px`,
        height: `${this.cropperData.height}px`,
        top: `${this.cropperData.y}px`,
        left: `${this.cropperData.x}px`,
      };

      if (this.previewCtx) {
        const canvas = this.$refs.previewCanvas;
        if (canvas) {
          canvas.width = this.cropperData.width;
          canvas.height = this.cropperData.height;
        }
      }
    },
    updatePreviewCanvas() {
      if (!this.isCropperActive) return;
      if (!this.previewCtx) {
        const canvas = this.$refs.previewCanvas;
        this.previewCtx = canvas.getContext("2d");
      }

      const video = this.$refs.videoPlayer;
      if (video) {
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        // Get the scale factors based on video and canvas size
        const scaleX = videoWidth / video.offsetWidth;
        const scaleY = videoHeight / video.offsetHeight;

        // Extract the cropper's area
        const { x, y, width, height } = this.cropperData;

        // Clear the canvas and redraw the cropped section of the video
        this.previewCtx.clearRect(0, 0, width, height); // Clear based on cropper size

        // Adjusting the cropper size to scale with video
        this.previewCtx.drawImage(
          video, // Video element
          x * scaleX, // Start cropping from this x position
          y * scaleY, // Start cropping from this y position
          width * scaleX, // Cropped width (scaled)
          height * scaleY, // Cropped height (scaled)
          0, // Destination x in canvas
          0, // Destination y in canvas
          width, // Destination width in canvas (same as cropper width)
          height // Destination height in canvas (same as cropper height)
        );
        // Keep updating the canvas with the next video frame
        this.frameRequest = requestAnimationFrame(this.updatePreviewCanvas);
      }
    },
    startCropper() {
      this.isCropperActive = true;
      // Wait until the DOM updates to access the previewCanvas ref
      this.$nextTick(() => {
        const canvas = this.$refs.previewCanvas;
        if (canvas) {
          this.previewCtx = canvas.getContext("2d"); // Reinitialize the canvas context
          this.updateCropperDimensions(); // Update cropper dimensions
          this.updatePreviewCanvas(); // Start drawing on the canvas
        }
      });
    },
    removeCropper() {
      this.isCropperActive = false;

      // Wait until the DOM updates to clear the canvas
      this.$nextTick(() => {
        const canvas = this.$refs.previewCanvas;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        }
      });
    },
    updateVideoProperties(record) {
      const { volume, playbackRate, timeStamp, coordinates } = record;

      const video = this.$refs.videoPlayer;
      const canvas = this.$refs.previewCanvas;

      if (video.volume !== parseFloat(volume)) {
        video.volume = parseFloat(volume);
        this.volume = volume;
      }

      if (video.playbackRate !== parseFloat(playbackRate)) {
        video.playbackRate = parseFloat(playbackRate);
        this.playbackRate = playbackRate;
      }

      this.seekTime = timeStamp;
      this.cropperStyle = {
        position: "absolute",
        left: `${coordinates[0]}px`,
        top: `${coordinates[1]}px`,
        width: `${coordinates[2] - coordinates[0]}px`,
        height: `${coordinates[3] - coordinates[1]}px`,
      };

      if (canvas && canvas.width !== (coordinates[2] - coordinates[0])) {
        canvas.width = coordinates[2] - coordinates[0];
      }

      this.updatePreviewCanvas();
    },

    startPreview() {
      if (this.records.length === 0) return;

      this.isCropperActive = true;
      this.sessionType = "preview";
      this.isPreviewing = true;

      const video = this.$refs.videoPlayer;
      const canvas = this.$refs.previewCanvas;

      video.currentTime = 0; // Start from the beginning
      const initialRecord = this.records[0];
      video.volume = parseFloat(initialRecord.volume);
      this.volume = parseFloat(initialRecord.volume);
      video.playbackRate = parseFloat(initialRecord.playbackRate);
      this.playbackRate = `${initialRecord.playbackRate}`;

      if (canvas) {
        canvas.width = initialRecord.coordinates[2] - initialRecord.coordinates[0];
        canvas.height = initialRecord.coordinates[3] - initialRecord.coordinates[1];
      }

      this.currentPreviewIndex = 0;
      let lastTimestamp = performance.now();
      video.pause();

      const playNextFrame = (timestamp) => {
        const elapsed = timestamp - lastTimestamp;

        if (this.currentPreviewIndex >= this.records.length) {
          video.pause();
          this.isPreviewing = false;
          return;
        }

        const record = this.records[this.currentPreviewIndex];
        const nextRecord = this.records[this.currentPreviewIndex + 1] || record;

        const frameDuration = ((nextRecord.timeStamp - record.timeStamp) / video.playbackRate) * 1000;

        if (elapsed >= frameDuration) {
          if (video.currentTime < record.timeStamp) {
            video.currentTime = record.timeStamp;
            video.play().catch(console.error);
          }

          this.updateVideoProperties(record);

          const videoRect = video.getBoundingClientRect();
          const cropperRect = this.$refs.cropper.getBoundingClientRect();

          let newX = Math.max(0, Math.min(record.coordinates[0], videoRect.width - cropperRect.width));
          let newY = Math.max(0, Math.min(record.coordinates[1], videoRect.height - cropperRect.height));

          this.cropperData.x = newX;
          this.cropperData.y = newY;

          this.currentPreviewIndex++;
          lastTimestamp = timestamp;
        }

        if (this.isPreviewing) requestAnimationFrame(playNextFrame);
      };

      requestAnimationFrame(playNextFrame);
    },
    endPreview() {
      this.isPreviewing = false;
    },
  },
  computed: {
    formattedCurrentTime() {
      return this.formatTime(this.seekTime);
    },
    formattedDuration() {
      return this.formatTime(this.duration);
    },
  },
};
</script>

<style scoped lang="less">
.video-editor-wrapper {
  background-color: #18191b;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-editor {
  width: 1082px;
  background-color: #37393f;
  border: 1px solid #37393f;
  border-radius: 10px;
  padding: 20px 0;
}

select {
  border: none;
  background: none;
  outline: none;
  font-size: 12px;
  color: #9ba6ab;
  border-radius: 4px;
  cursor: pointer;
}

.video-editor__header {
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 8px;
  padding: 0 12px;
}

.video-editor__title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  text-align: left;
}

.video-editor__tabs {
  background-color: #46474e;
  color: #ffffff;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
  font-size: 12px;
  padding: 2px;
}

.video-editor__preview,
.video-editor__session {
  padding: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}

.video-editor--active {
  background-color: #37393f;
  border-radius: 6px;
}

.video-editor__container {
  position: relative;
  display: flex;
  gap: 20px;
  margin-top: 35px;
  padding: 0 12px;
}

.video-editor__player {
  width: 460px;
  height: calc(460px * 9 / 16);
  background-color: #000;
  border-radius: 6px;
}

.video-editor__cropper-overlay {
  position: absolute;
  top: 0;
  left: 0;
}

.video-editor__cropper {
  position: absolute;
  border-top: none;
  border-bottom: none;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.7) 1px,
      transparent 1px) 0 0,
    /* Vertical dotted lines */
    linear-gradient(0deg, rgba(255, 255, 255, 0.7) 1px, transparent 1px) 0 0;
  /* Horizontal dotted lines */
  background-size: 33.14% 34.33%;
  background-repeat: repeat;
  z-index: 100;
  cursor: move;
  background-color: rgba(255, 255, 255, 0.3);
}

.video-editor__controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.video-editor__play-pause-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  /* Set fixed width */
  height: 30px;
  /* Set fixed height */
  position: relative;
}

/* Play Icon */
.video-editor__play-icon {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 16px solid white;
  transition: all 0.3s ease;
  transform: rotate(-89deg);
}

/* Pause Icon */
.video-editor__pause-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.video-editor__pause-icon::before,
.video-editor__pause-icon::after {
  content: "";
  width: 5px;
  height: 14px;
  background-color: white;
  margin: 0 3px;
}

.video-editor__volume {
  display: flex;
  color: #fff;
  align-items: center;
  margin-top: 8px;
  justify-content: space-between;
}

.video-editor__time {
  color: #fff;
}

.video-editor__volume-slider {
  margin-left: 7px;
}

.video-editor__volume-control {
  width: 60px;
  display: flex;
  align-items: center;
}

.video-editor__controls-group {
  display: flex;
  color: #fff;
  align-items: center;
  margin-top: 8px;
}

.video-editor__speed,
.video-editor__aspect-ratio-selector {
  padding: 7px 10px;
  border: 1px solid #45474e;
  border-radius: 5px;
  font-size: 12px;
}

.video-editor__aspect-ratio-selector {
  margin-left: 10px;
}

.video-editor__side-preview-wrapper {
  width: 100%;
}

.video-editor__side-preview-text {
  color: #fff;
  opacity: 50%;
}

.video-editor__side-preview {
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.video-editor__cropper-active {
  height: unset;
}

.video-editor__side-preview-content {
  color: #fff;
  width: 170px;
}

.video-editor__preview-not-available {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 5px;
  margin-top: 5px;
}

.video-editor__start-cropper-instruction {
  font-size: 12px;
  opacity: 50%;
}

.video-editor__actions {
  display: flex;
  padding-top: 20px;
  margin-top: 50px;
  border-top: 1px solid #494c55;
  padding-left: 12px;
}

.video-editor__start-cropper,
.video-editor__remove-cropper,
.video-editor__generate-preview {
  background-color: #7c36d6;
  color: #fff;
  padding: 9px 10px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}

.video-editor__remove-cropper,
.video-editor__generate-preview {
  margin-left: 10px;
}

.video-editor__preview-canvas {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  outline: none;
  transition: background-color 0.3s ease;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 2px;
  background: #ddd;
  border-radius: 5px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 11px;
  height: 11px;
  background: white;
  /* White thumb */
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type="range"]:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

input[type="range"]:disabled::-webkit-slider-thumb {
  background: #ccc;
}
</style>
