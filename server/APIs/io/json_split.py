import json
import sys

with open('output.json','r') as infile:
    o = json.load(infile)
    chunkSize = 4550
    for i in range(0, len(o), chunkSize):
        with open(sys.argv[1] + '_' + str(i//chunkSize) + '.json', 'w') as outfile:
            json.dump(o[i:i+chunkSize], outfile)