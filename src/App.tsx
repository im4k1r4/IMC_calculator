// Importando estilos do módulo de css:
import styles from './App.module.css'
// Importando imagem dos assets:
import poweredImage from './assets/powered.png'
// Importando o state:
import { useState } from 'react';
// Importando cálculo IMC:
import { levels, calculateImc, Level } from './helpers/imc'
// Importando Grid Item:
import { GridItem } from './components/GridItem'
// Importando imagem da seta de return
import leftArrowImage from './assets/leftarrow.png';


const App = () => {
  //state
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  //Fn acionada pelo button:
  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos.");
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corporal. É uma medida internacional usada para verificar se uma pessoa está em seu peso ideal com base em sua altura e peso. </p>

          <input 
          type="number"
          placeholder="Digite a sua altura. Ex.: 1.5 (metros)"
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

          <input 
          type="number"
          placeholder="Digite o seu peso. Ex.: 75.3 (kg)"
          value={weightField > 0 ? weightField : ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>

        </div>
        <div className={styles.rightSide}>
          {!toShow && // quando toShow estiver nulo
          <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item} />
            ))}
          
          </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;