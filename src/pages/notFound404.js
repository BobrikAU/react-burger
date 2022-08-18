import { Link } from 'react-router-dom';
import styles from './notFound404.module.css';

function NotFound404() {
  return(
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={`text text_type_main-large mb-20 ${styles.title}`}>К сожалению, запрошенная Вами страница не существует</h1>
        <Link to='/' className={`text text_type_main-default mb-5 ${styles.link}`}>Перейти на гравную страницу</Link>
        <Link to='/' className={`text text_type_main-default ${styles.link}`}>Вернуться на прежнюю страницу (доделать)</Link>
      </div>
    </main>
  )
}

export default NotFound404;