const React = require('react');
const Layout = require('./Layout');

module.exports = function SignUpPage({ title }) {
  return (
    <Layout title={title}>
      <div className="container signUpForm d-flex justify-content-center mt-5">
        <form className="signUpForm" id="signUpForm">
          <div className="mb-3">
            <input type="text" name="username" className="form-control" id="exampleInputName" placeholder="Enter your name" aria-describedby="nameHelp" />
          </div>
          <div className="mb-3">
            <input type="email" name="useremail" className="form-control" id="exampleInputEmail" placeholder="Enter your Email address" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input type="password" name="userpassword" className="form-control" placeholder="Enter your password" id="exampleInputPassword1" />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Sig up</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
