import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Карточка сервиса',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Обзор системы HeroTask: функции, технологический стек, SLA, архитектурные диаграммы C1 и C2.
      </>
    ),
    link: '/docs/intro',
    linkLabel: 'Открыть документацию',
  },
  {
    title: 'API Reference',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Интерактивная Swagger-документация REST API: герои, инциденты, задачи — с примерами запросов и ответов.
      </>
    ),
    link: '/docs/api/herotask',
    linkLabel: 'Открыть API Reference',
  },
  {
    title: 'Style Guide',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Правила оформления документации: структура, форматирование, диаграммы, адмониции и блоки кода.
      </>
    ),
    link: '/style-guide/',
    linkLabel: 'Открыть Style Guide',
  },
];

function Feature({Svg, title, description, link, linkLabel}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className="button button--outline button--primary button--sm" to={link}>
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
