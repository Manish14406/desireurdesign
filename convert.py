import os
from PIL import Image

def convert_avif_to_webp(folder):
    for root, dirs, files in os.walk(folder):
        for file in files:
            if file.lower().endswith('.avif'):
                file_path = os.path.join(root, file)
                new_file_path = os.path.splitext(file_path)[0] + '.webp'
                print(f"Converting {file_path} to {new_file_path}...")
                try:
                    with Image.open(file_path) as img:
                        img.save(new_file_path, 'webp')
                    os.remove(file_path)
                except Exception as e:
                    print(f"Error converting {file_path}: {e}")

if __name__ == '__main__':
    convert_avif_to_webp(r'c:\GautamModular\gautam-modular-kitchen-redesign\client\public\images')
