import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Typography
} from '@material-ui/core'
import { getPollResults, IPolls } from '@services/Polls'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useEffect, useState } from 'react'
import { Text } from './Text'
import { LoadingDiv } from '@components/LoadingDiv'

interface ResponsesPollsProps {
  currentPoll: number
}

const ResponsesPolls: React.FC<ResponsesPollsProps> = ({
  currentPoll
}: ResponsesPollsProps) => {
  const [results, setResults] = useState<IPolls>()
  const getResultsByPoll = async (id: number) => {
    const res = await getPollResults(id)
    setResults(res)
  }

  const [expanded, setExpanded] = useState<number | false>(0)

  const handleChange =
    (panel: number) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }
  const [expandedFollowup, setExpandedFollowup] = useState<number | false>(0)

  const handleChangeFollowup =
    (panel: number) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpandedFollowup(newExpanded ? panel : false)
    }

  useEffect(() => {
    getResultsByPoll(currentPoll)
  }, [currentPoll])

  return (
    <>
      {!results && <LoadingDiv />}
      {!!results &&
        results.questions.map(item => (
          <Accordion
            square={true}
            elevation={expanded === item.id ? 4 : 0}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body2">{item.question}</Typography>
              <Badge
                color="primary"
                badgeContent={item.__meta__.total_votes}
                style={{ marginLeft: 24 }}
              >
                Votos
              </Badge>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {item.type === 'paragraph' && <Text votes={item.votes} />}
              {item.type.includes('multiple') && <Text votes={item.votes} />}
              {item.type === 'zeroten' && <Text votes={item.votes} />}

              <Box style={{ padding: 16 }}>
                {item.followups.length > 0 && (
                  <>
                    <Typography component="h6">Follow Ups</Typography>
                    {item.followups.map(item => (
                      <Accordion
                        square={true}
                        elevation={expandedFollowup === item.id ? 4 : 0}
                        expanded={expandedFollowup === item.id}
                        onChange={handleChangeFollowup(item.id)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography variant="body2">
                            {item.question}
                          </Typography>
                          <Badge
                            color="primary"
                            badgeContent={item.__meta__.total_votes}
                            style={{ marginLeft: 24 }}
                          >
                            Votos
                          </Badge>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item.type === 'paragraph' && (
                            <Text votes={item.votes} />
                          )}
                          {item.type.includes('multiple') && (
                            <Text votes={item.votes} />
                          )}
                          {item.type === 'zeroten' && (
                            <Text votes={item.votes} />
                          )}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  )
}

export { ResponsesPolls }
