import React, { Fragment } from "react";
import CreateTodo from "../components/CreateTodo";
import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";

const Home = () => (
  <Fragment>
    <Hero />
    <CreateTodo />
    <HomeContent />
  </Fragment>
);

export default Home;