const React = require('react');
const Layout = require('./Layout');

module.exports = function SignInPage({ title }) {
  return (
    <Layout title={title}>
      <div className="container main signInForm d-flex justify-content-center mt-5">
        <div className="login_google">
          <a href="/auth/google">Login with google</a>
        </div>

        <form className="signInForm" id="signInForm">
          <div className="mb-3">
            <input type="email" name="useremail" className="form-control" id="exampleInputEmail" placeholder="Enter your Email address" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input type="password" name="userpassword" className="form-control" placeholder="Enter your password" id="exampleInputPassword1" />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
