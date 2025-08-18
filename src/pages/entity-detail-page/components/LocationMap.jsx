import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationMap = ({ entity }) => {
  if (!entity?.coordinates) {
    return null;
  }
  
  const { lat, lng } = entity?.coordinates;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
        <Icon name="MapPin" size={20} className="mr-2 text-primary" />
        Location
      </h2>
      <div className="space-y-4">
        {/* Address Information */}
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={16} className="text-muted-foreground mt-1" />
          <div>
            <p className="text-foreground font-medium">{entity?.name}</p>
            {entity?.address && (
              <p className="text-muted-foreground text-sm">{entity?.address}</p>
            )}
            <p className="text-muted-foreground text-sm">{entity?.location}</p>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={`${entity?.name} location`}
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
            className="border-0"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-micro"
          >
            <Icon name="Navigation" size={16} />
            <span>Get Directions</span>
          </a>
          
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-outline border border-border text-foreground rounded-lg hover:bg-muted transition-micro"
          >
            <Icon name="ExternalLink" size={16} />
            <span>View on Maps</span>
          </a>
        </div>

        {/* Additional Location Info */}
        {(entity?.nearbyLandmarks || entity?.publicTransport) && (
          <div className="pt-4 border-t border-border">
            {entity?.nearbyLandmarks && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Landmark" size={14} className="mr-1 text-muted-foreground" />
                  Nearby Landmarks
                </h4>
                <p className="text-sm text-muted-foreground">{entity?.nearbyLandmarks}</p>
              </div>
            )}
            
            {entity?.publicTransport && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Train" size={14} className="mr-1 text-muted-foreground" />
                  Public Transport
                </h4>
                <p className="text-sm text-muted-foreground">{entity?.publicTransport}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;