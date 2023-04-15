import Card from './Card'
import List from './List'
import Paper from './Paper'
import Input from './Input'
import Table from './Table'
import AppBar from './AppBar'
import Button from './Button'
import Tooltip from './Tooltip'
import Backdrop from './Backdrop'
import Typography from './Typography'
import Autocomplete from './Autocomplete'
import ListItemButton from './ListItemButton'

export default function ComponentsOverrides(theme) {
    return Object.assign(
        Card(theme),
        List(theme),
        Table(theme),
        Input(theme),
        Paper(theme),
        AppBar(theme),
        Button(theme),
        Tooltip(theme),
        Backdrop(theme),
        Typography(theme),
        Autocomplete(theme),
        ListItemButton(theme)
    )
}
