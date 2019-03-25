import * as React from 'react';

import {classNames} from '@shopify/react-utilities';
import {ExternalMinor} from '@shopify/polaris-icons';

import UnstyledLink from '../UnstyledLink';
import Icon, {IconSource} from '../Icon';

import styles from './Link.scss';

export interface BaseProps {
  /** ID for the link */
  id?: string;
  /** The url to link to */
  url?: string;
  // /** An icon that represents the link content */
  // icon?: IconSource;
  /** An icon that hints what type of interaction to expect */
  trailingIcon?: IconSource;
  /** The content to display inside link */
  children?: React.ReactNode;
  /** Use for a links that open a different site */
  external?: boolean;
  /** Makes the link color the same as the current text color and adds an underline */
  monochrome?: boolean;
  /** Callback when a link is clicked */
  onClick?(): void;
}

export interface Props extends BaseProps {}

export default function Link({
  url,
  trailingIcon,
  children,
  onClick,
  external,
  id,
  monochrome,
}: Props) {
  const className = classNames(styles.Link, monochrome && styles.monochrome);
  let childrenMarkup;

  if ((external || trailingIcon) && typeof children === 'string') {
    const lastWord = children.slice(children.lastIndexOf(' '));
    const rest = children.slice(0, children.lastIndexOf(' '));
    const iconSource = external ? ExternalMinor : trailingIcon;
    const iconLabel = external ? '(opens a new window)' : undefined;

    childrenMarkup = (
      <React.Fragment>
        {rest}{' '}
        <span className={styles.IconLockup}>
          {lastWord}
          <Icon accessibilityLabel={iconLabel} source={iconSource} />
        </span>
      </React.Fragment>
    );
  } else {
    childrenMarkup = children;
  }

  return url ? (
    <UnstyledLink
      onClick={onClick}
      className={className}
      url={url}
      external={external}
      id={id}
    >
      {childrenMarkup}
    </UnstyledLink>
  ) : (
    <button type="button" onClick={onClick} className={className} id={id}>
      {childrenMarkup}
    </button>
  );
}
