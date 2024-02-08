import Feed from "@components/Feed"



const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            Promptopia is a platform for discovering and sharing AI-powered prompts. 
            <br className="max-md:hidden" />
            Get inspired and inspire others with your creativity.
        </p>

        <Feed />
    </section>
  )
}

export default Home