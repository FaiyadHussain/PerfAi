import React from "react";
import Hajhouse from "../Images/hajhouse.jpg";

const Home = () => {
  return (
    <div className="flex w-full justify-center  text-center p-6">
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl font-bold mb-4 text-green-900">
              WAQF Board
              <span className="block h-1 w-12 bg-green-900 mt-2"></span>{" "}
            </h1>
            <p className="text-lg text-green-900 mb-6">
              “Waqf” means the permanent dedication by a person professing
              Islam, of any movable or immovable property for any purpose
              recognized by the Muslim law as pious, religious or charitable and
              includes -
            </p>
            <p className="text-lg text-gray-600">
              Grants, including mushrut-ul-khidmat for any purpose recognised by
              the Muslim law as pious, religious or charitable. A
              wakf-alal-aulad to the extent to which the property is dedicated
              for any purpose recognised by Muslim law as pious, religious or
              charitable.
            </p>
          </div>

          <div className="lg:w-1/2 mt-8 m lg:mt-0">
            <img
              src={Hajhouse}
              alt="Waqf Board"
              className="rounded-ee-2xl rounded-ss-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
