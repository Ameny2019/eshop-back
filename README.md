# E-shop BackEnd project.

This project is developped with `NodeJS`. You can clone it and run `npm install` to install all dependencies of this project.

## Run the project.

You can run this project with this commands : 

1. Dev mode with `nodemon app.js` or `npm start`.
2. Prod mode with `node app.js`.

## Google G-mail configuration:

Check [this video](https://www.youtube.com/watch?v=xvX4gWRWIVY) to configure your gmail account.

## Deploy the app as heroku app.

You can follow these steps to deploy your NodeJS application as Heroku App.

1. Create your account in [Heroku](https://www.heroku.com/).

2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

3. Login with Heroku CLI: By default, the `heroku login` command now opens your web browser to complete the login flow.

2. Create an application from the dashboard or using the heroku CLI: you can use two ways to create an application in heroku: either from the heroku dashboard or from the heroku CLI, I recommend using the first way for simplicity.

    **NOTE :** Type `heroku apps:create example` to create a new heroku app named `exemple` if you're use the heroku CLI. Check [this tutorial](https://devcenter.heroku.com/articles/creating-apps) to create a new heroku app using the heroku CLI. This way will create a git remote automatically named `heroku` in your project.

5. Add remote named `heroku` (Optional): this step is necessary in case you have created an application from the heroku dashboard. Indeed, it consists in run the following command `git remote add heroku URL` and the URL options you can find in hthe dashboard of heroku (Application Settings Tab).

6. Deploy you app: you can deploy your nodeJS application  by pushing your code in the remote named heroku (type following command `git push heroku master` to do this).

    **NOTES :** 
        
    - You can deploy your application in a branch named `master` or `main`, and any other branch will not be considered. 

    - Don't forget to configure your environnement variables in the heroku dashboard ( Application Settings Tab -> Config Vars). 

    - You're not allowed to configure the `port` in the environnement variables (I think for security reasons in heroku).


## Deploy the app in VPS (Virtual Private Perver).

You can follow these steps to deploy your NodeJS application in a VPS.

1. Buy a VPS from [Zen Hosting](https://www.zenhosting.tn/) or another provider. It's recommended to use Zen Hosting in Tunisia because it accepts the payment in Tunisian dinar (DTN) from an e-dinar card or a bank card.

2. Use SSH to connect your VPS instance: you can use any SSH client on MacOS, Linux, Ubuntu or another operation system. In Windows OS you don't have any pre-installed software to use SSH so you have to install software to use SSH. In this case you can use [putty](https://www.putty.org/).

    **NOTE :** It is necessary to indicate the username and the password to connect with SSH.

3. Create and configure your SSH Key (Optional): In order to simplify the SSH connection, you have to do this step which consists in generating a pair of keys (public key and private key) and add the public key to your server in the `authorized_keys` file. You can follow [this tutorial](https://linuxhint.com/configure-authorized-keys-ssh-ubuntu/) to configure this step on Ubuntu and/or MacOS.


    **NOTE :** In Windows OS you don't have any pre-installed software to generate this key. So you can use [putty](https://www.puttygen.com/) to generate the SSH key in your Windows OS. You can follow [this video tutorial](https://www.youtube.com/watch?v=kBB_iN4_Xsg) to generate this key.

4. Install Git in your server: type the following command to install Git in your server `sudo apt install git-all -y`. You can use [this full tutorial](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Installation-de-Git) to install it in your server.

5. Install NodeJS in pour server: type the following command to install NodeJS in your server `sudo apt install nodejs -y`. You can use [this full tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) to install it in your server.

6. Install NPM in your server: type the following command to install NPM in your server `sudo apt install npm`. You can use [this full tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) to install it in your server.

7. Install the [MP2]() in your server: type the following command to install PM2 in your server `npm install pm2 -g`. You can use [this full tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps) to install it in your server.

    **NOTE :** PM2 it's not the only node process manager in production environments. You can also use this package named [forever](https://www.npmjs.com/package/forever).

8. Start your NodeJS app: type the following command to start your NodeJS app with PM2 in your server `pm2 start app.js`.

    **NOTE :** Run your app using PM2, and ensure that your NodeJS application starts automatically when your server restarts and/or after any app failure.