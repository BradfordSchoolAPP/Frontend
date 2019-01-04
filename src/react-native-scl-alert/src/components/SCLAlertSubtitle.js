import React from 'react'
import PropTypes from 'prop-types'

import {
  ScrollView,
  ViewPropTypes,
  StyleSheet,
  Text
} from 'react-native'

import variables from '../config/variables'

SCLAlertSubtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
  subtitleContainerStyle: ViewPropTypes.style,
  subtitleStyle: Text.propTypes.style
}

SCLAlertSubtitle.defaultProps = {
  subtitleContainerStyle: {},
  subtitleStyle: {}
}

function SCLAlertSubtitle (props) {
  return (
    <ScrollView style={[styles.container, props.subtitleContainerStyle]}>
      <Text style={[styles.subtitle, props.subtitleStyle]}>
        {props.subtitle}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf:"center",
    height:80,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: variables.mediumFontSize,
    color: variables.subtitleColor,
    fontWeight: '300'
  }
})

export default SCLAlertSubtitle
