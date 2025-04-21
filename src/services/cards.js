/**
 * Service for managing project cards/tasks using localStorage
 */
class Cards {
  constructor() {
    this.storageKey = 'project_cards';
    this._initializeStorage();
  }

  /**
   * Initialize storage if not already done
   * @private
   */
  _initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  /**
   * Get all cards from localStorage
   * @private
   * @returns {Array} All cards
   */
  _getAllCards() {
    const cardsString = localStorage.getItem(this.storageKey);
    return JSON.parse(cardsString) || [];
  }

  /**
   * Save all cards to localStorage
   * @private
   * @param {Array} cards - Cards to save
   */
  _saveCards(cards) {
    localStorage.setItem(this.storageKey, JSON.stringify(cards));
  }

  /**
   * Generate a unique ID for new cards
   * @private
   * @returns {number} New unique ID
   */
  _generateId() {
    const cards = this._getAllCards();
    const maxId = cards.reduce((max, card) => Math.max(max, card.id || 0), 0);
    return maxId + 1;
  }

  /**
   * Get all cards for a specific project
   * @param {number|string} projectId - Project ID to get cards for
   * @returns {Promise<Array>} Array of cards
   */
  async getCardsByProjectId(projectId) {
    try {
      // Converter projectId para número para garantir compatibilidade
      const numericProjectId = Number(projectId);
      
      const cards = this._getAllCards();
      const projectCards = cards
        .filter(card => Number(card.project_id) === numericProjectId)
        .sort((a, b) => a.order - b.order);
      
      return projectCards;
    } catch (error) {
      console.error('Error retrieving cards:', error);
      return [];
    }
  }

  /**
   * Create a new card/task
   * @param {Object} cardData - Card data to create
   * @returns {Promise<Object>} Created card
   */
  async createCard(cardData) {
    try {
      const cards = this._getAllCards();
      
      // Converter projectId para número
      const projectId = Number(cardData.projectId);
      
      // Find highest order value for this project
      const projectCards = cards.filter(card => Number(card.project_id) === projectId);
      const highestOrder = projectCards.length > 0 
        ? Math.max(...projectCards.map(card => card.order)) 
        : -1;
      
      // Create new card with a unique ID
      const newCard = {
        id: this._generateId(),
        project_id: projectId,
        text: cardData.text,
        description: cardData.description || null,
        column: cardData.column,
        participants: cardData.participants || null,
        theme: cardData.theme || null,
        due_date: cardData.dueDate ? new Date(cardData.dueDate).toISOString() : null,
        urgency: cardData.urgency || 'normal',
        order: highestOrder + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      cards.push(newCard);
      this._saveCards(cards);
      
      return newCard;
    } catch (error) {
      console.error('Error creating card:', error);
      throw new Error('Failed to create card');
    }
  }

  /**
   * Update a card's column (status)
   * @param {number|string} cardId - Card ID to update
   * @param {string} column - New column/status
   * @returns {Promise<Object>} Updated card
   */
  async updateCardColumn(cardId, column) {
    try {
      const cards = this._getAllCards();
      // Converter cardId para número
      const numericCardId = Number(cardId);
      
      const cardIndex = cards.findIndex(card => Number(card.id) === numericCardId);
      
      if (cardIndex === -1) {
        throw new Error('Card not found');
      }
      
      cards[cardIndex].column = column;
      cards[cardIndex].updated_at = new Date().toISOString();
      
      this._saveCards(cards);
      return cards[cardIndex];
    } catch (error) {
      console.error('Error updating card column:', error);
      throw new Error('Failed to update card column');
    }
  }

  /**
   * Delete a card
   * @param {number|string} cardId - Card ID to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteCard(cardId) {
    try {
      const cards = this._getAllCards();
      // Converter cardId para número
      const numericCardId = Number(cardId);
      
      const updatedCards = cards.filter(card => Number(card.id) !== numericCardId);
      
      this._saveCards(updatedCards);
      return true;
    } catch (error) {
      console.error('Error deleting card:', error);
      throw new Error('Failed to delete card');
    }
  }

  /**
   * Update card details
   * @param {number|string} cardId - Card ID to update
   * @param {Object} cardData - New card data
   * @returns {Promise<Object>} Updated card
   */
  async updateCard(cardId, cardData) {
    try {
      const cards = this._getAllCards();
      // Converter cardId para número
      const numericCardId = Number(cardId);
      
      const cardIndex = cards.findIndex(card => Number(card.id) === numericCardId);
      
      if (cardIndex === -1) {
        throw new Error('Card not found');
      }
      
      // Update only provided fields
      if (cardData.text !== undefined) cards[cardIndex].text = cardData.text;
      if (cardData.description !== undefined) cards[cardIndex].description = cardData.description;
      if (cardData.urgency !== undefined) cards[cardIndex].urgency = cardData.urgency;
      if (cardData.theme !== undefined) cards[cardIndex].theme = cardData.theme;
      if (cardData.column !== undefined) cards[cardIndex].column = cardData.column;
      if (cardData.order !== undefined) cards[cardIndex].order = cardData.order;
      
      // Handle date separately
      if (cardData.dueDate !== undefined) {
        cards[cardIndex].due_date = cardData.dueDate ? new Date(cardData.dueDate).toISOString() : null;
      }
      
      // Handle participants separately
      if (cardData.participants !== undefined) {
        cards[cardIndex].participants = cardData.participants;
      }
      
      // Update timestamp
      cards[cardIndex].updated_at = new Date().toISOString();
      
      this._saveCards(cards);
      return cards[cardIndex];
    } catch (error) {
      console.error('Error updating card:', error);
      throw new Error('Failed to update card');
    }
  }
}

const cardsService = new Cards();
export default cardsService;