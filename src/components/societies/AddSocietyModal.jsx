import { useState } from 'react';
import { Building, MapPin, User, Grid } from 'lucide-react';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';

export default function AddSocietyModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    admin: '',
    blocks: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (parseInt(formData.blocks) <= 0) {
      setError('Number of blocks must be a positive number');
      return;
    }

    // Pass the form data back to the parent component
    onAdd(formData);
    // Reset form (optional, depending on preference)
    setFormData({ name: '', location: '', admin: '', blocks: '' });
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Society">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Society Name</label>
          <Input
            icon={Building}
            placeholder="e.g. Gokuldham Society"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
          <Input
            icon={MapPin}
            placeholder="e.g. Mumbai, Goregaon"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Admin Name</label>
          <Input
            icon={User}
            placeholder="e.g. Bhide"
            value={formData.admin}
            onChange={(e) => setFormData({...formData, admin: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Blocks</label>
          <Input
            icon={Grid}
            type="number"
            placeholder="e.g. 4"
            value={formData.blocks}
            onChange={(e) => setFormData({...formData, blocks: e.target.value})}
            required
            min="1"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Society
          </Button>
        </div>
      </form>
    </Modal>
  );
}