export const NotFound: React.FC = () => {
  return (
    <div className="">
      <section className="px-[0] py-[40px] bg-[#fcfafa] font-['Arvo']">
        <div className="container">
          <div className="row">
            <div className="">
              <div className="flex flex-col gap-20 text-center">
              <h1 className="text-[80px] -mb-20">404</h1>
                <div className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[400px] bg-center">
                </div>
                <div className="-pt-[100px]">
                  <h3 className="text-4xl mb-4">Look like you're lost</h3>
                  <p className="text-3xl">the page you are looking for not avaible!</p>

                  <a href="/" className="!text-[#fff] px-[20px] py-[10px] bg-[#39ac31] hover:bg-[#2e692a] mx-[0] my-[20px] text-xl rounded-lg font-medium inline-block">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
