import os
import sys
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np

def extract_and_layer():
    input_path = r'C:\Users\David\.gemini\antigravity-ide\brain\58fd59d1-2db1-4802-908d-4d05e9d1d365\.user_uploaded\media_1787766985185.jpg'
    output_dir = r'c:\Users\David\Music\IKOLI\ikoli-era-site\public\assets'
    os.makedirs(output_dir, exist_ok=True)

    img = Image.open(input_path).convert('RGB')
    width, height = img.size
    print(f"Original image dimensions: {width}x{height}")

    # Check if rembg is available
    has_rembg = False
    try:
        from rembg import remove
        has_rembg = True
        print("Using rembg for state-of-the-art segmentation...")
        robot_rgba = remove(img)
    except Exception as e:
        print(f"rembg error or not ready: {e}. Using PIL/numpy edge keying...")
        arr = np.array(img, dtype=np.float32)
        # Background is grey gradient: R, G, B are roughly equal and in range [70..130]
        # In the corners/edges, it's uniform grey.
        r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
        is_grey = (np.abs(r - g) < 15) & (np.abs(g - b) < 15) & (np.abs(r - b) < 15)
        # Gradient brightness estimation from borders
        # Sample left and right border
        border_brightness = (arr[:, :20, :].mean() + arr[:, -20:, :].mean()) / 2.0
        brightness = (r + g + b) / 3.0
        diff = np.abs(brightness - border_brightness)
        
        # Center robot is distinct with strong contrast and shadows/reflections
        mask = np.zeros((height, width), dtype=np.uint8)
        # Center region mask
        cx = width // 2
        for y in range(height):
            for x in range(width):
                dist_x = abs(x - cx)
                # Keep central torso/head silhouette
                if dist_x < 320:
                    if not (is_grey[y, x] and diff[y, x] < 12):
                        mask[y, x] = 255
                    elif y > height * 0.4 and dist_x < 240:
                        mask[y, x] = 255
        
        mask_img = Image.fromarray(mask).filter(ImageFilter.GaussianBlur(2))
        robot_rgba = img.convert('RGBA')
        robot_rgba.putalpha(mask_img)

    # Crop/Trim empty transparent borders with small padding
    bbox = robot_rgba.getbbox()
    if bbox:
        # Keep full width context if desired or crop nicely
        cropped_robot = robot_rgba.crop(bbox)
    else:
        cropped_robot = robot_rgba

    # Save full transparent robot
    robot_out_path = os.path.join(output_dir, 'ikoli-android-robot.png')
    cropped_robot.save(robot_out_path, format='PNG', optimize=True)
    print(f"Saved full robot to: {robot_out_path} ({cropped_robot.size})")

    # Now create Head and Body separate layers for 2.5D depth illusion!
    # Head is roughly the top 44% of the robot height
    rw, rh = cropped_robot.size
    head_cutoff = int(rh * 0.44)
    
    # Head layer: keep y < head_cutoff with smooth feather gradient
    head_img = cropped_robot.copy()
    head_arr = np.array(head_img)
    for y in range(rh):
        if y > head_cutoff + 30:
            head_arr[y, :, 3] = 0
        elif y > head_cutoff - 30:
            fade = 1.0 - (y - (head_cutoff - 30)) / 60.0
            head_arr[y, :, 3] = (head_arr[y, :, 3] * fade).astype(np.uint8)
    head_layer = Image.fromarray(head_arr)
    head_path = os.path.join(output_dir, 'ikoli-android-head.png')
    head_layer.save(head_path, format='PNG', optimize=True)
    print(f"Saved head layer to: {head_path}")

    # Body layer: keep y > head_cutoff - 40 with smooth feather gradient
    body_img = cropped_robot.copy()
    body_arr = np.array(body_img)
    for y in range(rh):
        if y < head_cutoff - 40:
            body_arr[y, :, 3] = 0
        elif y < head_cutoff + 20:
            fade = (y - (head_cutoff - 40)) / 60.0
            body_arr[y, :, 3] = (body_arr[y, :, 3] * fade).astype(np.uint8)
    body_layer = Image.fromarray(body_arr)
    body_path = os.path.join(output_dir, 'ikoli-android-body.png')
    body_layer.save(body_path, format='PNG', optimize=True)
    print(f"Saved body layer to: {body_path}")

if __name__ == '__main__':
    extract_and_layer()
