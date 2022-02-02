function GoogleButton({ renderProps }) {
  return (
    <button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      className="px-5 py-3 text-xs md:text-sm lg:text-base border shadow"
    >
      <img
        alt="Google sign-in"
        className="h-4 md:h-5 inline mr-4"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
      />
      Sign in with Google
    </button>
  );
}

export default GoogleButton;
