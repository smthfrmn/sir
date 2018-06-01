import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import urlMetaData from "url-metadata";

const Contact = () => (
    <div className="contact">
        <div className="email">
            <div className="inner">
                shesinrussia@gmail.com
            </div>
        </div>
    </div>

)

class Home extends Component {
    constructor(props){
        super(props);
        this.latestEpisodes = [];
        this.latestArticles = [];
        this.getLatestEpisodes = this.getLatestEpisodes.bind(this);
        this.getLatestArticles = this.getLatestArticles.bind(this);
    }

    getLatestEpisodes() {
        fetch('http://localhost:8000/episodes/?limit=5')

            .then(response => response.json())
            .then(data => {
                this.latestEpisodes = data['body'];
                this.forceUpdate();
            })
            .catch(console.log("what"))
    }

    getLatestArticles() {
        fetch('http://localhost:8000/articles/?limit=3')
            .then(response => response.json())
            .then(data => {
                var body = data['body']
                this.latestArticles = body
                this.forceUpdate();
            })
            .catch(console.log("what"))

    }

    componentDidMount(){
        this.getLatestEpisodes();
        this.getLatestArticles();
        console.log(this.latestArticle);
    }


    render() {
        var recentArticles = this.latestArticles.map(function(article) {
            return(

                    <div className="article-container">
                        <a href={article.url}>
                            <div className="img-container" style={{maxHeight: "280px", backgroundImage: 'url(' + article.image + ')', backgroundSize: 'cover'}}>
                                <img className="article" style={{opacity: '0', width: '166px', height: '166px   '}} src={article.image} />
                            </div>
                            <div className="text-container">
                                <h2 className="art-title">{article.title}</h2>
                                <div className="description">
                                    {article.description}
                                </div>
                                <div className="art-site">
                                    <span>{article.site}</span>
                                </div>
                            </div>
                        </a>
                    </div>
            )
        
        })

        var latestEpisode = this.latestEpisodes[0]
        var latestEpisode = (latestEpisode)?<div className="row">
                        <div className="episode">
                            <iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + latestEpisode.track_id + "&color=%23fc484c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"}></iframe>
                        </div>
                        <div className="ep-description">
                            <p style={{fontWeight: "bold"}}>{latestEpisode.title}</p>
                            <p>{latestEpisode.description}</p>
                        </div>
                    </div>:<div />

        var episodes = this.latestEpisodes.slice(1)
        var recentEpisodes = (episodes)? episodes.map(function(episode) {

            return(
                    <div className="row">
                        <div className="episode">
                            <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+ episode.track_id + "&color=%23fc484c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"}></iframe>
                        </div>
                        <div className="ep-description">
                            <p style={{fontWeight: "bold"}}>{episode.title}</p>
                            <p>{episode.description}</p>
                        </div>
                    </div>
            
            )
        }):<div/>
        return ( 
            <div>
                <div style={{fontStyle: "italic", fontWeight: "bold", marginBottom: "10px"}}>This week on SIR</div>
                <div className="this-week">
                    {latestEpisode}
                </div>
                <div className="newsletter">
                     <form action="https://tinyletter.com/shesinrussia" method="post" target="popupwindow" onSubmit={"window.open('https://tinyletter.com/shesinrussia', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"}>
                        <label htmlFor="tlemail">Subscribe to our monthly imaged-based newsletter. Scout's honor, no spam.</label>
                        <p><input className="email-input" type="text" name="email" id="tlemail"/></p>
                        <input type="hidden" value="1" name="embed"/>
                        <input type="submit" value="Subscribe" />
                    </form>
                </div>
                <div className="section-header">Latest Press</div>
                <div className="container">
                    {recentArticles}
                </div>
                <div className="more-episodes">
                    <div className="section-header">Recent Episodes</div>
                    {recentEpisodes}
                </div>
            </div>
        )
    }
}

const About = () => (
    <div className="about">
        <img src="img/cover.jpeg" style={{ margin: "auto", display: "block"}}/>
	<div className="vertical-wrapper">
	    <p>The Cold War ended in 1991. Now its looming specter has returned to US and Russian politics and media. On this podcast two best friends -- one in <span className="hover-me hover-top">St. Petersburg</span> and one in <span className="hover-me hover-bottom">Brooklyn</span> -- address this situation the way they like best: by talking.</p>
	</div>
	<div className="vertical-wrapper">
	    <p>Since late 2013, with the start of what’s now referred to as the <span className="hover-me hover-bottom">Ukrainian Crisis</span>, the US and Russia have been engaged in a state of tension and information warfare, sometimes referred to as Cold War II. The recent US-based intrigue and investigation into the relationship between Putin, Trump and some not so anonymous hackers <span className="hover-me hover-top">(#FancyBear)</span> has increased tensions and hostility to a fever pitch, most notably in the politics and media of the American Left.</p>
	</div>
	<div className="vertical-wrapper">
	    <p>In the US, a deep-seated aversion to what ‘Russia’ represents, which lay briefly dormant since the fall of the Berlin Wall, has reared its ugly head, and this time its <span className="hover-me hover-bottom">mouthpiece</span> is Liberal. In Russia, politicians in power and State-run media more often than not hold an unabashedly anti-Western position, encouraging knee-jerk nationalism and resentment of the US, its allies, and all that it represents.

	    </p>
	</div>
	<div className="vertical-wrapper">
	    <p>Cold War II represents and encourages some of humanity’s very worst tendencies - towards xenophobia, ignorance, falsity. Citizens of the US and Russia continue to have limited contact with each other and to imagine the other as projected by their respective Politics and Media, who provide them with little more than <span className="hover-me hover-top">caricature</span> and sensationalism.
	    </p>
	</div>
	<div className="vertical-wrapper">
	    <p>This <span className="hover-me hover-top">podcast</span> is an ongoing attempt to push back against the above tendencies. To talk about the relationship between these two nations in a way that is nuanced, thoughtful, emotional, sometimes funny, and rooted in a healthy combination of research and real-life experience.
	    </p>
	</div>
	<div className="vertical-wrapper">
	  <p>Episodes every Tuesday. Hosted by <span className="hover-me hover-bottom">Smith Freeman and Olivia Capozzalo</span>.</p>
	</div>
    </div>
)

const Episodes = () => (
  <div>
    <h2>About</h2>
  </div>
)

class Press extends Component {
    constructor(props){
        super(props);
        this.articles = [];
        this.getArticles = this.getArticles.bind(this);
    }

    getArticles() {
        fetch('http://localhost:8000/articles/?limit=10')
            .then(response => response.json())
            .then(data => {
                var body = data['body']
                this.articles = body
                this.forceUpdate();
            })
            .catch(console.log("what"))

    }

    componentDidMount(){
        this.getArticles();
        console.log(this.latestArticle);
    }

    render() {
        var recentArticles = this.articles.map(function(article) {
            return(
                    <div>
                        <div className="article-container">
                            <a href={article.url}>
                                <div className="img-container" style={{maxHeight: "280px", backgroundImage: 'url(' + article.image + ')', backgroundSize: 'cover'}}>
                                    <img className="article" style={{opacity: '0', width: '166px', height: '166px   '}} src={article.image} />
                                </div>
                                <div className="text-container">
                                    <h2 className="art-title">{article.title}</h2>
                                    <div className="description">
                                        {article.description}
                                    </div>
                                    <div className="art-site">
                                        <span>{article.site}</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                </div>
            )
        
        })
        return ( 
            <div>
                <div>
                    {recentArticles}
                </div>
            </div>
        )
    }


}

const Navigation = () => (
    <Router>
	<div>
            <div className="nav-bar">
                <ul className="Header_links">
                  <li className="Header_link"><span className="title">She's In Russia</span></li>
                  <li className="Header_link">
                        <Link to="/">Home</Link>
                  </li>
                  <li className="Header_link">
                    <Link to="/about">About</Link>
                  </li>
                  <li className="Header_link">
                    <Link to="/episodes">Episodes</Link>
                   </li>
                  <li className="Header_link">
                    <Link to="/press">Press</Link>
                  </li>
                  <li className="Header_link">
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
            </div>
            <div className="main-container">
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/episodes" component={Episodes} />
                <Route path="/press" component={Press} />
                <Route path="/contact" component={Contact} />
            </div>
	</div>
    </Router>
);

class App extends Component {

  render() {
    console.log(this.latestEpisode)
    return (
	<div> { Navigation() }</div>
    );
  }
}

export default App;
