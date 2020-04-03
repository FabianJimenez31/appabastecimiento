import os
from AppAbastecernos.util.media_support import MediaSupport

class Config:

    def __init__(self):
        self.mysqldb_host = os.getenv("MYSQLDB_HOST")
        self.mysqldb_username = os.getenv("MYSQLDB_USERNAME")
        self.mysqldb_password = os.getenv("MYSQLDB_PASSWORD")
        self.mysqldb_name = os.getenv("MYSQLDB_NAME")
        self.mysqldb_port = os.getenv("MYSQLDB_PORT")
        self.django_secretkey = os.getenv("SECRET_KEY")
        self.enviroment = os.getenv("ENV")
        self.api_komercia = os.getenv("API_KOMERCIA")
        self.migration_stores = os.getenv("MIGRATION_STORES")
        self.media_url = os.getenv("MEDIA_URL")
        self.media_root = os.getenv("MEDIA_ROOT")
        media_support = MediaSupport(self.media_root)
        media_support.create_folder_media()

    
    def get_connectiondb(self):
        return  {
            "host": self.mysqldb_host,
            "name": self.mysqldb_name,
            "password": self.mysqldb_password,
            "username": self.mysqldb_username,
            "port":self.mysqldb_port
        }

    def get_secret_key(self):
        return self.django_secretkey
    
    def get_api_komercia(self):
        return self.api_komercia
    
    def get_migration_stores(self):
        return self.migration_stores
    
    def get_media_info(self):
        return {
            "media_url":self.media_url,
            "media_root":self.media_root
        }
        