const createObjects = {
    newUserObjectCreator(newUsername, newEmail, newPassword) {
		return {
			"username": newUsername,
			"email": newEmail,
			"password": newPassword
		}
	},
	
	// this function creates a key/value pair to be PATCHed
	patchedKeyValueObjectCreator (key, value) {
		return { [key]: value }
	}
}

const createHTML = {

	createNewUserWelcomeMessage() {
		const loggedInUserObj = (JSON.parse(sessionStorage.getItem('user')))
		
		return `
			<article class='welcomeContainer' id="welcomeNewUserContainer">
				<h1 class='welcomeHeader' id='welcomeNewUserHeader'>
					Welcome ${loggedInUserObj.username}!
				</h1>
				<p class='welcomeMessage' id="welcomeNewUserMessage">
					This is everything in <em>YOUR</em> Nutshell.
					<br><br>
					Click on the tabs above to explore and create the content that matters to you most!
				</p>
			</article>
		`
	},

	createReturningUserWelcomeMessage() {
		const loggedInUserObj = (JSON.parse(sessionStorage.getItem('user')))

		return `
			<article class='welcomeContainer' id="welcomeReturningUserContainer">
				<h1 class='welcomeHeader' id='welcomeReturningUserHeader'>
					Welcome back ${loggedInUserObj.username}!
				</h1>
				<p class='welcomeMessage' id="welcomeReturningUserMessage">
					Keep exploring and creating everything in <em>YOUR</em> Nutshell.
				</p>
			</article>
		`
	},

    createLoginForm() {
        return `
        <div class="form-wrap">
		<div class="tabs">
			<h3 class="signup-tab"><a class="active" href="#signup-tab-content">Sign Up</a></h3>
			<h3 class="login-tab"><a href="#login-tab-content">Login</a></h3>
		</div><!--.tabs-->
		<div class="tabs-content">
			<div id="signup-tab-content" class="active">
				<form class="signup-form">
					<input type="text" class="input" id="new-username" autocomplete="off" placeholder="Username">
					<input type="email" class="input" id="new-userEmail" autocomplete="off" placeholder="Email">
					<input type="password" class="input" id="new-userPassword" autocomplete="off" placeholder="Password">
					<button type="button" class="button" id="signUpButton">Sign Up</button>
				</form><!--.login-form-->
				<div class="help-text">
					<p>By signing up, you agree to our</p>
					<p><a href="#">Terms of service</a></p>
				</div><!--.help-text-->
			</div><!--.signup-tab-content-->
			<div id="login-tab-content">
				<form class="login-form">
					<input type="text" class="input" id="userEmail" autocomplete="off" placeholder="Email">
					<input type="password" class="input" id="userPassword" autocomplete="off" placeholder="Password">
					<input type="checkbox" class="checkbox" id="remember_me">
					<label for="remember_me">Remember me</label>
					<button type="button" class="button" id="loginButton">Login</button>
				</form><!--.login-form-->
				<div class="help-text">
					<p><a href="#">Forget your password?</a></p>
				</div><!--.help-text-->
			</div><!--.login-tab-content-->
		</div><!--.tabs-content-->
	</div><!--.form-wrap-->`

    },

    createMainButtons(userId) {
        return `
        <nav id="resourceButtons">
            <button type="button" id="myFriends-${userId}">Friends</button>
            <button type="button" id="myNews-${userId}">News</button>
            <button type="button" id="myEvents-${userId}">Events</button>
            <button type="button" id="myTasks-${userId}">Tasks</button>
			<button type="button" id="myAll-${userId}">See All</button> 
			<button type="button" id="logout-${userId}">Logout</button> 
      </nav>
        `
    }
}



export {createHTML, createObjects} 