# Diploma

Diploma is an offline educational platform for incarcerated people that streamlines prison education into one consistent curriculum to further their education. 

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

## Building and Running the Site
After some code changes, you can start the server with `$ python manage.py runserver`. To get the list of available Django subcommands, you can type `$ django-admin help
`. If not viewing the live site, visit `http://127.0.0.1:8000/` to see your changes.

Once the site is loaded, you will see the welcome page that branches to a login or sign up page. During this process, the site prompts the student to input a major. In a *Current Year* page, it provides a space for the student to map out their courses for two semestes, while storing the information in their course history. Another view is the *Four Year* page that shows all of their courses. On both pages, a checklist is keeping track of all of the requirements for the major. Once the student selects their first course, the checklist will also update and mark the course as completed. The third view, *Co-Curricular* contains more checklists, pulled from other resources on campus, that aren't necessarily academic but can help the student set their self up for life post college.


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

This project is licensed under the MIT License - [see more](license.md).

