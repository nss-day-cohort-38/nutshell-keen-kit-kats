const createObjects = {
    objectCreator() {
        console.log('come back later')
    }
}

const createHTML = {

    createLoginForm() {
        return `
        <div class="form-wrap">
		<div class="tabs">
			<h3 class="signup-tab"><a class="active" href="#signup-tab-content">Sign Up</a></h3>
			<h3 class="login-tab"><a href="#login-tab-content">Login</a></h3>
		</div><!--.tabs-->
		<div class="tabs-content">
			<div id="signup-tab-content" class="active">
				<form class="signup-form" action="" method="post">
					<input type="email" class="input" id="user_email" autocomplete="off" placeholder="Email">
					<input type="text" class="input" id="user_name" autocomplete="off" placeholder="Username">
					<input type="password" class="input" id="user_pass" autocomplete="off" placeholder="Password">
					<input type="submit" class="button" id="creatUserButton" value="Sign Up">
				</form><!--.login-form-->
				<div class="help-text">
					<p>By signing up, you agree to our</p>
					<p><a href="#">Terms of service</a></p>
				</div><!--.help-text-->
			</div><!--.signup-tab-content-->
			<div id="login-tab-content">
				<form class="login-form" action="" method="post">
					<input type="text" class="input" id="user-email" autocomplete="off" placeholder="Email">
					<input type="password" class="input" id="user-password" autocomplete="off" placeholder="Password">
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
      </nav>
        `
    }
}



export {createHTML, createObjects} 