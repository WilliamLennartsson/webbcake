import sys
import json

if len(sys.argv) > 1:

    width = int(sys.argv[1])
    height = int(sys.argv[2])
    row = int(sys.argv[3])
    col = int(sys.argv[4])
    filename = sys.argv[5]
    frameWidth = width / row
    frameHeight = height / col
    framesTot = row * col
    
    data = {}
    frames =  {}
    animations = {}
    meta = {
            'app': 'webbcake',
            'image': filename,
            'size': {
                'w': int(width),
                'h': int(width)
            }
            }
    x = 0
    y = 0

    for i in range(framesTot):

        if y == height:
            break

        frames[filename + str(i) + '.png'] = {
            'frame': {
                'x': int(x),
                'y': int(y),
                'w': int(frameWidth),
                'h': int(frameHeight)
                },
            'rotated': False,
            'trimmed': False,
            'spriteSourceSize': {
                'w': int(frameWidth),
                'h': int(frameHeight)
                },
            'sourceSize': {
                'w': int(frameWidth),
                'h': int(frameHeight)
                }
                }

        if x + frameWidth == width:
            x = 0 - frameWidth
            y += frameHeight
        
        x += frameWidth

    data['frames'] = frames
    data['meta'] = meta

    with open(filename + '.json', 'w') as outfile:
        json.dump(data, outfile)

    print('Created ' + filename + '.json')

else:
    print('')
    print('##########################')
    print('# No arguments provided! #')
    print('##########################')
    print('')
    print('Use:')
    print('python3 spritegenerator.py <width> <height> <frames/row> <frames/column> <yourFilename>')
    print('')
    print('width: width of image')
    print('height: height of images')
    print('frames/row: spriteframes/row')
    print('frames/col: spriteframes/col')
    print('filename: Use filename of image')
