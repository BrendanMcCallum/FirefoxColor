import React from 'react';
import { connect } from 'react-redux';

import { createAppStore, makeActions, selectors } from '../../../../lib/store';

import BrowserPreview from '../BrowserPreview';
import ThemeColorsEditor from '../ThemeColorsEditor';
import ThemeBackgroundPicker from '../ThemeBackgroundPicker';
import ExtensionInstallButton from '../ExtensionInstallButton';

const actions = makeActions({ context: 'web' });

const mapStateToProps = (state, ownProps) => ({
  theme: selectors.theme(state),
  hasExtension: selectors.hasExtension(state),
  selectedColor: selectors.selectedColor(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setBackground: args => dispatch(actions.theme.setBackground(args)),
  setColor: args => dispatch(actions.theme.setColor(args)),
  setSelectedColor: args => dispatch(actions.ui.setSelectedColor(args))
});

export const App = ({
  theme,
  hasExtension,
  selectedColor,
  setColor,
  setSelectedColor,
  setBackground
}) =>
  <div className="app">
    {!hasExtension && <ExtensionInstallButton />}
    <BrowserPreview {...{ theme, selectedColor, setSelectedColor }} />
    <ThemeColorsEditor
      {...{ theme, selectedColor, setColor, setSelectedColor }}
    />
    <ThemeBackgroundPicker {...{ theme, setBackground }} />
  </div>;

export default connect(mapStateToProps, mapDispatchToProps)(App);
