const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>© {new Date().getFullYear()} NHS. All rights reserved.</p>
            <p className="mt-2">
              <a
                href="https://www.nhs.uk/accessibility/"
                className="hover:underline"
              >
                Accessibility
              </a>
              {" | "}
              <a
                href="https://www.nhs.uk/our-policies/privacy-policy/"
                className="hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
