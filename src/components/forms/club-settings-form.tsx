'use client'

import { UseFormReturn } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { format } from 'date-fns'

export type IClubSettingForm = {
  feeCollectionMethod?: string | 'online' | 'offline'
  clubRegistrationEnabled?: boolean
  clubRegistrationFees?: number
  clubRegistrationStartsAt?: Date
  clubRegistrationEndsAt?: Date
}

interface ClubSettingsFormProps {
  form: UseFormReturn<IClubSettingForm>
  isEditing: boolean
  isUpdating: boolean
}

const feeCollectionMethods = [
  { value: 'online', label: 'Online Payment Only' },
  { value: 'offline', label: 'Cash/Bank Transfer Only' },
  { value: 'both', label: 'Both Online & Offline' },
  { value: 'free', label: 'Free Membership' }
]

export function ClubSettingsForm({
  form,
  isEditing,
  isUpdating
}: ClubSettingsFormProps) {
  const registrationEnabled = form.watch('clubRegistrationEnabled')

  return (
    <Form {...form}>
      <div className="space-y-6">
      {/* Registration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Settings</CardTitle>
          <CardDescription>
            Configure how new members can join your club
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="clubRegistrationEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Club Registration
                  </FormLabel>
                  <FormDescription>
                    Allow new members to register for your club
                  </FormDescription>
                </div>
                {isEditing ? (
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isUpdating}
                    />
                  </FormControl>
                ) : (
                  <p className="text-sm font-medium">
                    {field.value ? 'Enabled' : 'Disabled'}
                  </p>
                )}
              </FormItem>
            )}
          />

          {registrationEnabled && (
            <>
              <FormField
                control={form.control}
                name="feeCollectionMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Collection Method</FormLabel>
                    {isEditing ? (
                      <Select
                        disabled={isUpdating}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fee collection method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {feeCollectionMethods.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">
                        {feeCollectionMethods.find(m => m.value === field.value)?.label || 'Not provided'}
                      </p>
                    )}
                    <FormDescription>
                      Choose how members will pay registration fees
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('feeCollectionMethod') !== 'free' && (
                <FormField
                  control={form.control}
                  name="clubRegistrationFees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Fees ($)</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            disabled={isUpdating}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                          />
                        </FormControl>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">
                          ${field.value?.toFixed(2) || '0.00'}
                        </p>
                      )}
                      <FormDescription>
                        Amount to charge for club membership
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clubRegistrationStartsAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Start Date</FormLabel>
                      {isEditing ? (
                        <FormControl>
                          <Input
                            type="date"
                            value={field.value ? field.value.toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                            disabled={isUpdating}
                            className="w-full"
                          />
                        </FormControl>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">
                          {field.value ? format(field.value, 'PPP') : 'Not set'}
                        </p>
                      )}
                      <FormDescription>
                        When registration opens for new members
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clubRegistrationEndsAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? field.value.toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                          disabled={!isEditing || isUpdating}
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription>
                        When registration closes for new members
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
          <CardDescription>
            Other club management settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Registration Status</h4>
              <p className="text-sm text-muted-foreground">
                {registrationEnabled ? (
                  <span className="text-green-600">✓ Registration is currently enabled</span>
                ) : (
                  <span className="text-red-600">✗ Registration is currently disabled</span>
                )}
              </p>
              {registrationEnabled && (
                <div className="text-xs text-muted-foreground space-y-1">
                  {form.watch('clubRegistrationStartsAt') && (
                    <p>Opens: {format(form.watch('clubRegistrationStartsAt')!, "PPP")}</p>
                  )}
                  {form.watch('clubRegistrationEndsAt') && (
                    <p>Closes: {format(form.watch('clubRegistrationEndsAt')!, "PPP")}</p>
                  )}
                  {form.watch('clubRegistrationFees') && form.watch('feeCollectionMethod') !== 'free' && (
                    <p>Fee: ${form.watch('clubRegistrationFees')}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </Form>
  )
}