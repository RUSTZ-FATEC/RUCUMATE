import styles from "../../../style";
import discount from "../../../assets/images/discount.svg";

const Hero: React.FC = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col items-center justify-center xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-[#202124] rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span> desconto na{" "}
            <span className="text-white">instalação</span> dos equipamentos
          </p>
        </div>

        <div className="flex flex-row items-center justify-center text-center w-full">
          <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Proxima Geração
          </h1>
        </div>

        <h1 className="flex items-center justify-center font-poppins font-semibold text-center ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Monitoramento inteligente.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-center`}>
          Suas plantações merecem a excelência da tecnologia. Nosso time integrou IoT e sites para proporcionar resultados superiores.
        </p>
      </div>
    </section>
  );
};

export default Hero;