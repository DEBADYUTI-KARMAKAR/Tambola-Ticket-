const TambolaTicket = require('../model/TambolaTicket')

const createTicket = async (req, res) => {
  const { numbers: numberOfTickets, userId } = req.body

  const tickets = []
  for (let i = 0; i < numberOfTickets; i++) {
    const ticketId = generateUniqueId()
    const numbers = generateTicketNumbers()
    const ticket = new TambolaTicket({ ticketId, numbers })
    tickets.push(ticket)

    await ticket.save()
  }

  res.json({ tickets })
}

const getTambolaTickets = async (req, res) => {
  const { userId } = req.params
  const { page, limit } = req.query

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
  }

  try {
    const result = await TambolaTicket.paginate({ userId }, options)

    res.json(result)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the tickets' })
  }
}

function generateUniqueId() {
  const timestamp = Date.now().toString()
  const randomNumber = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  const uniqueId = timestamp + randomNumber

  return uniqueId
}

function generateTicketNumbers() {
  const ticketNumbers = []

  for (let i = 0; i < 3; i++) {
    const rowNumbers = []
    const min = i * 10 + 1
    const max = i * 10 + 10

    while (rowNumbers.length < 5) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min

      
      if (!rowNumbers.includes(randomNum)) {
        rowNumbers.push(randomNum)
      }
    }

    rowNumbers.sort((a, b) => a - b)
    ticketNumbers.push(rowNumbers)
  }

  return ticketNumbers;
}
module.exports = { createTicket, getTambolaTickets }