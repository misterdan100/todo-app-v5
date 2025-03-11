import styles from './spinner.module.css'

interface Props {
    tailwindClasses?: string
}

export const Spinner = ({tailwindClasses}: Props) => {

  return (
    <div className={styles.spinner + ' ' + tailwindClasses}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className="bounce3"></div>
    </div>
  );
};
