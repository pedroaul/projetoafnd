import './home.css';

function Home() {
    return(
        <section className='homeSec'>
                <div className='txt'>
                    <h1 className='mainTitle'>CRIE O SEU <br/> PRÓPRIO AUTÔMATO!</h1>
                    <p className='homeP'>Aqui você poderá criar seus autômatos de maneira simples e prática que irão te <br/> salvar quando precisar entregar aquele trabalho caprichado e fácil de compreender. </p>
                </div>
                <div className='prevSize'>
                    <h2 className='prevSub'>Preview</h2>
                </div>
                <div className='preview'>
                    <div className='prevEx'/>
                </div>
        </section>
    );
}

export default Home;