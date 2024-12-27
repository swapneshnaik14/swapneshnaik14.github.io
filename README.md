**Video Cropper**

The Video Cropper allows users to dynamically crop video content, integrate a video player, overlay a cropper layer with multiple aspect ratios, and provide a real-time preview of the cropped segment.

**Features and Requirements**

1. **Video Player Integration**

1.1 **Static Media Content**

Implementation: Use a video player to display static media content.

Aspect Ratio: Ensure the video file uses a 16:9 aspect ratio.

1.2 **Playback Controls
**
Provide controls for:

Play

Pause

Seek

1.3 **Playback Rate Control**

Allow users to adjust playback speed with the following options:

0.5x

1x

1.5x

2x

1.4 **Volume Control**

Include volume adjustment options for the user.

2. **Cropper Layer**

2.1 **Overlay**

Overlay a cropper layer on top of the video player.

2.2 **Aspect Ratios**

Support the following aspect ratios:

9:18

9:16

4:3

3:4

1:1

4:5

2.3 **Movable and Resizable**

Ensure the cropper is:

Movable

Resizable

Requirements:

The cropper must occupy 100% of the video player’s height.

The cropper must stay within the video player’s dimensions.

3. **Dynamic Preview**

3.1 **Real-Time Update**

Provide a dynamic preview of the cropped segment in a designated area.

Ensure real-time updates with negligible delay between the video player and the preview.

3.2 **Aspect Ratio Matching**

Match the preview’s aspect ratio to the cropper’s aspect ratio.

Display the preview within a fixed height and width container.

Ensure the parent container (Modal) height remains constant regardless of the cropper’s aspect ratio.

4. **UI and Functionality**

4.1 **Design Specifications**

Match the UI to the provided Figma design with pixel-perfect accuracy.

4.2 **Coordinates Recording**

Record the following data points at multiple intervals:

Cropper’s coordinates

Time elapsed

Volume level

Playback rate

The Video Cropper allows users to dynamically crop video content, integrate a video player, overlay a cropper layer with multiple aspect ratios, and provide a real-time preview of the cropped segment.
