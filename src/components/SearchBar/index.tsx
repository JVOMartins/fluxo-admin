import { Box, IconButton, InputBase, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles'

const SearchBar: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <Box>
        <Paper elevation={0} component="form" className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder="Pesquisar"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </>
  )
}

export default SearchBar
