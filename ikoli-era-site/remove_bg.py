import sys
from PIL import Image
import numpy as np

def remove_white_bg(input_path, output_path, tolerance=240, feather=20):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    
    # Calculate brightness / whiteness
    # Since the subject is dark chrome / black and the background is pure white / light grey
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Whiteness metric: minimum of R, G, B
    whiteness = np.minimum(np.minimum(r, g), b)
    
    # Create smooth alpha mask
    # Whiteness >= tolerance -> alpha = 0
    # Whiteness <= (tolerance - feather) -> alpha = 255
    # In between -> linear interpolation
    low = tolerance - feather
    high = tolerance
    
    alpha = np.clip((high - whiteness) / (high - low), 0.0, 1.0) * 255.0
    
    data[:, :, 3] = alpha
    
    result = Image.fromarray(data.astype(np.uint8), "RGBA")
    result.save(output_path, "PNG")
    print(f"Successfully processed {input_path} -> {output_path}")

if __name__ == "__main__":
    input_p = r"c:\Users\David\Music\IKOLI\ikoli-era-site\public\assets\ikoli-hero-cutout.png"
    output_p = r"c:\Users\David\Music\IKOLI\ikoli-era-site\public\assets\ikoli-hero-transparent.png"
    remove_white_bg(input_p, output_p, tolerance=245, feather=30)
