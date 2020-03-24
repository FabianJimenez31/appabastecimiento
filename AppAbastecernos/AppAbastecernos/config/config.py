import os

class Config:

    def __init__(self):
        self.mysqldb_host = os.getenv("MYSQLDB_HOST")
        self.mysqldb_username = os.getenv("MYSQLDB_USERNAME")
        self.mysqldb_password = os.getenv("MYSQLDB_PASSWORD")
        self.mysqldb_name = os.getenv("MYSQLDB_NAME")
        self.mysqldb_port = os.getenv("MYSQLDB_PORT")
        self.django_secretkey = os.getenv("SECREY_KEY")
        self.enviroment = os.getenv("ENV")

    
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