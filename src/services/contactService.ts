import { Contact, ColumnMapping, ContactValidationSummary } from '../types/contact';
import { mockContacts, defaultColumnMappings, mockValidationSummary } from '../mocks/contacts';

class ContactService {
  private contacts: Contact[] = [...mockContacts];

  async getContacts(search?: string): Promise<Contact[]> {
    await new Promise((res) => setTimeout(res, 50));
    if (!search) return [...this.contacts];
    const q = search.toLowerCase();
    return this.contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
    );
  }

  async getValidationSummary(): Promise<ContactValidationSummary> {
    return mockValidationSummary;
  }

  async getDefaultMappings(): Promise<ColumnMapping[]> {
    return [...defaultColumnMappings];
  }

  async addContact(contact: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
    await new Promise((res) => setTimeout(res, 50));
    const newContact: Contact = {
      ...contact,
      id: `cnt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.contacts.unshift(newContact);
    return newContact;
  }

  async deleteContact(id: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 50));
    this.contacts = this.contacts.filter((c) => c.id !== id);
    return true;
  }
}

export const contactService = new ContactService();
