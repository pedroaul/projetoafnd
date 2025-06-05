import './home.css';

function Home() {
    return(
        <section className='homeSec' id='home'>
                <div className='txt'>
                        <div className='interface'>
                            <h1 className='mainTitle'>CRIE O SEU <br/> PRÓPRIO AUTÔMATO!</h1>
                            <p className='homeP'>Aqui você poderá criar seus autômatos de maneira simples e prática que irão te <br/> salvar quando precisar entregar aquele trabalho caprichado e fácil de compreender. </p>
                        </div>
                    </div>
                <div className='interface'>
                    <div className='prevSize'>
                        <h2 className='prevSub'>Preview</h2>
                    </div>
                    <div className='preview'>
                        <video src='/video/preview.mp4'
                            autoPlay
                            loop
                            muted
                            playsInline
                        ></video>
                    </div>
                </div>
        </section>
    );
}

export default Home;