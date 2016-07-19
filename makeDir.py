import os
alphabets = range(0,26)
for alphabet in alphabets:
    os.makedirs('./'+chr(ord('a') + alphabet))
