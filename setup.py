from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in mosyerdesign/__init__.py
from mosyerdesign import __version__ as version

setup(
	name="mosyerdesign",
	version=version,
	description="Design For Mosyer App",
	author="Tahir Zaqout",
	author_email="zaqout2000@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
