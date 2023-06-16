import styles from "../../../style";
import Button from "./Button";

const CTA: React.FC = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Experimente nosso serviço agora mesmo!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Descubra como podemos facilitar o monitoramento de suas plantações e fornecer insights valiosos para sua atividade. Experimente nossa solução hoje mesmo!
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <Button styles={"mt-10"} />
    </div>
  </section>
);

export default CTA;