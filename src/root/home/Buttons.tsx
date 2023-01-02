import { Stack, Button} from "@mui/material";
import React from 'react'

const Buttons = () => {
  return (
    <Stack direction={'row'} style={{justifyContent:'space-between'}}>
      <Button style={{marginLeft:10, marginTop:10}} variant="contained">ΤΑΙΝΙΕΣ</Button>
      <Button style={{marginTop:10}} variant="contained">ΚΙΝΗΜΑΤΟΓΡΑΦΟΙ</Button>
      <Button  style={{marginTop:10}}variant="contained">ΑΙΘΟΥΣΕΣ</Button>
      <Button style={{marginRight:10, marginTop:10}} variant="contained">INFO</Button>
    </Stack>
  )
}

export default Buttons