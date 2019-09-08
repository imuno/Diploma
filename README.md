# Diploma

Diploma is an offline educational platform for incarcerated people that streamlines prison education into one consistent curriculum to further their education. 

Diploma is an offline educational platform for incarcerated people that streamlines prison education from a number of systems, books, and teaching methods into one consistent way for them to further their education. Notably, Diploma’s offline capability accounts for how many incarcerated do not have internet access. Additionally, existing Diploma users can continue to learn about Diploma after their release from prison. 

Why does education matter for people incarcerated? There are currently 2.3 million people incarcerated in the United States. Of these people, 37% do not have a GED or high school diploma, and prison education programs are routinely underfunded and understaffed. This makes it difficult for people to access opportunity upon release from prison, contributing to a cycle of recidivism where around 40% of people will become incarcerated again within three years of being released (The Petey Greene Program). Yet, education significantly reduces recidivism. Studies have proven this and continue to highlight the importance of education in changing the narrative of incarceration. But next steps vary from state to state, prison to prison, and non-profit to non-profit. With Diploma, we hope to bring consistency to the process of prison education to allow for a better experience for people incarcerated.


## Authors
* **Bella Muno**
* **Blien Habtu**
* **Ziyao Wang (Claire)**

## Getting Started
### Prerequisites
- `Python 3.7`
- `pip`
- `virtualenv`

To test if Python is installed correctly, open terminal and enter `$ python` to check what version you have. Pip can be installed with `$ python get-pip.py`. Following that, if you don't have virtual environments set up, you can install them with `$ pip3 install virtualenv`. Virtual environments allow you to download anything to a specific directory without affecting other files.

### Installation and Set Up
First, clone Diploma's repository to your local machine
```
$ git clone https://github.com/imuno/Diploma.git
```
Next, go to the directory and create a new Python 3 virtual environment.

#### Virtual environments in Linux/MacOS
While in the project directory, use the terminal to set up your virtual environment with `$ virtualenv -p python3 env`. Then, activate the virtual environment with the command command `$ source env/bin/activate`. If needed, you can later deactivate the environment with `$ deactivate`. If that doesn't work, you can try If this doesn't work , try `$ source deactivate`.


####  Virtual environments in Windows
Set up your virtual environment with `$ virtualenv env` and activate the virtual environment with the command command `$ env\Scripts\Activate`. If needed, you can later deactivate the environment with `$ deactivate`.


Finally, install all dependencies via the command
```
$ pip install -r requirements.txt
```

## Running the Site
You can start the server with `$ python manage.py runserver`. To get the list of available Django subcommands, you can type `$ django-admin help
`. If not viewing the live site, visit `http://127.0.0.1:8000/` to see your changes.




## Deployment

*Project Status:* This project was an idea hatched during the Fall 2019 PennApps Hackathon. Diploma is still under development.

## Built With
* HTML/CSS/Java Script - Front-end
* Web Development: [Django](https://www.djangoproject.com/) - Back-end Python Web framework


## Contributing & Support
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

If you have made any changes and would like to push to our repo, here are some helpful commands:

* `$ git status` will tell you about any untracked files
* `$ git add -A` adds all files to the commit
* `$ git commit -m` “This is my first commit \!” saves your changes with a message so they can be easily tracked, if you wish
* `$ git push -u origin master` pushes your code to the master branch of the origin repository


## License

This project is licensed under the MIT License.

