
wget http://ftp.us.debian.org/debian/pool/main/i/icu/libicu57_57.1-6+deb9u2_amd64.deb
sudo dpkg -i libicu57_57.1-6+deb9u2_amd64.deb

wget http://mirrors.kernel.org/ubuntu/pool/main/i/icu/libicu60_60.2-6ubuntu1_amd64.deb
sudo dpkg -i libicu60_60.2-6ubuntu1_amd64.deb

sudo apt-get update
sudo apt-get install dotnet-sdk-2.1 -y


wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install azure-functions-core-tools -y
