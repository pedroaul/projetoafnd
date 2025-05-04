import './home.css';

function Home() {
    return(
        <section className='homeSec'>
                <h1 className='mainTitle'>CRIE SEU PRÓPRIO AUTÔMATO!</h1>
                <div className='flexSection'>
                <div className='txt'> 
                        <h2 className='sub1'>Irá facilitar seus estudos, trabalho e entendimento de autômatos.</h2>
                        <p className='homeP'>Aqui você poderá criar seus autômatos de maneira simples e prática que irão te salvar quando precisar entregar aquele trabalho caprichado e fácil de compreender. </p>
                        <h2 className='sub2'>Não precisa mais fazer a moda antiga e desenhar tudo a mão! </h2>
                        <p className='homeP'>Uma solução fácil e moderna de se usar para não perder mais tempo fazendo linhas e círculos com papel e caneta.</p>
                    </div>
                    <img src='../../images/automato.png' alt='automato' className='firstImage'></img>
                </div>
                <div className='colorSec'>
                    <h3 className='thirdSub'>Crie inúmeras possibilidades e salve onde quiser!</h3>
                    <img src='../../images/criarautomato.jpg' className='secondImage'/>
                </div>
        </section>
    );
}

export default Home;