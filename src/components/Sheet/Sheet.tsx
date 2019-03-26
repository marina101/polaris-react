import * as React from 'react';

import {SheetProps, frameContextTypes, FrameContext} from '../Frame';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

interface Props extends SheetProps {}

export type ComposedProps = Props & WithAppProviderProps;

export class Sheet extends React.PureComponent<ComposedProps, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  componentDidMount() {
    const {
      props,
      context: {
        frame: {showSheet},
      },
    } = this;
    const {open, onClose, children} = props;

    const sheetProps: Props = {
      open,
      onClose,
      children,
    };

    open === true && showSheet(sheetProps);
  }

  componentDidUpdate({open: oldOpen}: Props) {
    const {
      props,
      context: {
        frame: {showSheet, hideSheet},
      },
    } = this;
    const {open, onClose, children} = props;

    const sheetProps: Props = {
      open,
      onClose,
      children,
    };

    if (oldOpen === false && open === true) {
      showSheet(sheetProps);
    } else if (oldOpen === true && open === false) {
      hideSheet(sheetProps);
    }
  }

  componentWillUnmount() {
    const {
      props,
      context: {
        frame: {hideSheet},
      },
    } = this;
    const {open, onClose, children} = props;

    const sheetProps: Props = {
      open,
      onClose,
      children,
    };

    open === false && hideSheet(sheetProps);
  }

  render() {
    return null;
  }
}

export default withAppProvider<Props>()(Sheet);
