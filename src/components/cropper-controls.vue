<template>
    <div class="video-editor__actions" v-if="sessionType === 'generate'">
      <div 
        class="video-editor__start-cropper" 
        @click="startCropper" 
        :disabled="isCropperActive" 
        :class="{ 'disabled': isCropperActive }" 
      >
        Start Cropper
      </div>
      <div 
        class="video-editor__remove-cropper" 
        @click="removeCropper" 
        :disabled="!isCropperActive" 
        :class="{ 'disabled': !isCropperActive }" 
      >
        Remove Cropper
      </div>
      <div class="video-editor__generate-preview" @click="$emit('logRecords')">
        Generate Preview
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sessionType: {
        type: String,
        required: true,
      },
      isCropperActive:{
        type: Boolean,
        required: true,
      }
    },
    methods: {
      startCropper() {
        this.$emit('startCropper');
      },
      removeCropper() {
        this.$emit('removeCropper');
      },
    },
  };
  </script>
  
  <style scoped lang="less">

.video-editor__actions {
  display: flex;
  padding-top: 20px;
  margin-top: 50px;
  border-top: 1px solid #494c55;
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

.video-editor__start-cropper.disabled,
.video-editor__remove-cropper.disabled {
  background-color: rgba(124, 54, 214, 0.5); /* Opaque background */
  cursor: not-allowed; /* Change cursor to indicate disabled state */
  opacity: 0.5; /* Make the button appear opaque */
}
</style>

