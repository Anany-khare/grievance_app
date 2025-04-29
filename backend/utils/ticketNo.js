const generateTicketNo = () => {
    return 'TICKET-' + Math.random().toString(36).substring(2, 15);
  };
  
  module.exports = { generateTicketNo };
  