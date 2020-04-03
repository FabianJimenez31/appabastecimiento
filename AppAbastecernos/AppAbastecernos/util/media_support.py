import os
from pathlib import Path



class MediaSupport:
    def __init__(self, media_root):
        self.BaseDir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 
        self.media_root = media_root
        self.images = 'images'

    
    def create_folder_media(self):
        folder = Path(self.BaseDir+'/'+self.media_root)
        if folder.exists() is not True:
            folder.mkdir()
        
        folder = Path(self.BaseDir+'/'+self.media_root+'/'+self.images)

        if folder.exists() is not True:
            folder.mkdir()


        



    

