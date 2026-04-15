import { Loader } from '@mantine/core';

import styles from './BaseLoader.module.css'

export default function BaseLoader() {
  return (
    <div className={styles.center}>
      <h3>Ожидайте загрузки..</h3>
  <Loader color="blue" />
  </div>
  );
}