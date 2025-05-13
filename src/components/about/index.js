import './about.css';

function About() {
    return(
        <div className='main'>
                <div className='aboutTxt'>
                    <h1 className='aboutSub'>Bora entender um pouco sobre <span>Autômatos</span>?</h1>
                    <p className='aboutP'>Na Ciência da computação, teoria dos autômatos é o estudo dos objetos matemáticos chamados máquinas abstratas, ou autômatos, e os problemas computacionais que podem ser resolvidos usando esses objetos. Autômato vem da palavra grega a?t?µata que significa “ação sem influência externa; automático”.
                    </p>
                    <br/>
                    <p className='aboutP'>Dentre os autômatos, temos a máquina de estados finitos que consiste em estados (geralmente representados por <span>círculos</span>), e transições (representadas por <span>setas</span>). Quando o autômato recebe um símbolo de entrada, ele faz uma transição (ou salto) para outro estado, de acordo com sua função de transição (que tem como entradas o estado atual e o símbolo recente).</p>
                </div>
        </div>//MAIN
    );
}

export default About;