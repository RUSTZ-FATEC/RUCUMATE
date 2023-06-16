import { features } from '../constants/index';
import styles, { layout } from '../../../style';
import Button from './Button';

interface Feature {
  id: string;
  icon: string;
  title: string;
  content: string;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  content: string;
  index: number;
}

function FeatureCard({ icon, title, content, index }: FeatureCardProps) {
  return (
    <>
      <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
        <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
          <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
        </div>
        <div className="flex-1 flex flex-col ml-3">
          <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
            {title}
          </h4>
          <p className="font-poppins font-normal text-white text-[16px] leading-[24px]">
            {content}
          </p>
        </div>
      </div>
    </>
  );
};

function Business() {
  return (
    <>
      <section id="features" className={layout.section}>
        <div className={layout.sectionInfo}>
          <h2 className={styles.heading2}>
            Eficiência máxima,  <br className="sm:block hidden" /> resultados extraordinários.
          </h2>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Libere o potencial completo do seu monitoramento de estufas para colheitas excepcionais e sucesso duradouro
          </p>

          <Button styles={'mt-10'} />
        </div>

        <div className={`${layout.sectionImg} flex-col`}>
          {features.map((feature: Feature, index: number) => (
            <FeatureCard key={feature.id} {...feature} index={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Business;